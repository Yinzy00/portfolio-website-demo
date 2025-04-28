using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Languages.Delete;

public record DeleteLanguageCommand(string Id) : IRequest<bool>;

public class DeleteLanguageCommandHandler : IRequestHandler<DeleteLanguageCommand, bool>
{
    private readonly string _dataPath = "Data/Language.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public DeleteLanguageCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<bool> Handle(DeleteLanguageCommand request, CancellationToken cancellationToken)
    {
        var languages = await GetLanguagesAsync(cancellationToken);
        
        var removed = languages.RemoveAll(e => e.Id == request.Id);
        if (removed == 0)
            return false;
            
        await SaveLanguagesAsync(languages, cancellationToken);
        return true;
    }
    
    private async Task<List<Domain.Language>> GetLanguagesAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return new List<Domain.Language>();

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? new List<Domain.Language>() 
            : JsonSerializer.Deserialize<List<Domain.Language>>(json, _jsonOptions) ?? new List<Domain.Language>();
    }
    
    private async Task SaveLanguagesAsync(List<Domain.Language> languages, CancellationToken cancellationToken)
    {
        var directory = Path.GetDirectoryName(_dataPath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var json = JsonSerializer.Serialize(languages, _jsonOptions);
        await File.WriteAllTextAsync(_dataPath, json, cancellationToken);
    }
}