using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Education.Delete;

public record DeleteEducationCommand(string Id) : IRequest<bool>;

public class DeleteEducationCommandHandler : IRequestHandler<DeleteEducationCommand, bool>
{
    private readonly string _dataPath = "Data/Education.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public DeleteEducationCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<bool> Handle(DeleteEducationCommand request, CancellationToken cancellationToken)
    {
        var educations = await GetEducationsAsync(cancellationToken);
        
        var removed = educations.RemoveAll(e => e.Id == request.Id);
        if (removed == 0)
            return false;
            
        await SaveEducationsAsync(educations, cancellationToken);
        return true;
    }
    
    private async Task<List<Domain.Education>> GetEducationsAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return new List<Domain.Education>();

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? new List<Domain.Education>() 
            : JsonSerializer.Deserialize<List<Domain.Education>>(json, _jsonOptions) ?? new List<Domain.Education>();
    }
    
    private async Task SaveEducationsAsync(List<Domain.Education> educations, CancellationToken cancellationToken)
    {
        var directory = Path.GetDirectoryName(_dataPath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var json = JsonSerializer.Serialize(educations, _jsonOptions);
        await File.WriteAllTextAsync(_dataPath, json, cancellationToken);
    }
}