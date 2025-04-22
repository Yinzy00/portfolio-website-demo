using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Languages.Create;

public record CreateLanguageCommand(string Name, int Proficiency) : IRequest<Domain.Language>;

public class CreateLanguageCommandHandler : IRequestHandler<CreateLanguageCommand, Domain.Language>
{
    private readonly string _dataPath = "Data/Language.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public CreateLanguageCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<Domain.Language> Handle(CreateLanguageCommand request, CancellationToken cancellationToken)
    {
        var languages = await GetLanguagesAsync(cancellationToken);
        
        var language = new Domain.Language
        {
            Id = Guid.NewGuid().ToString(),
            Name = request.Name,
            Proficiency = request.Proficiency
        };
        
        languages.Add(language);
        await SaveLanguagesAsync(languages, cancellationToken);
        
        return language;
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