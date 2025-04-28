using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Education.Update;

public record UpdateEducationCommand(string Id, string Name) : IRequest<bool>;

public class UpdateEducationCommandHandler : IRequestHandler<UpdateEducationCommand, bool>
{
    private readonly string _dataPath = "Data/Education.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public UpdateEducationCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<bool> Handle(UpdateEducationCommand request, CancellationToken cancellationToken)
    {
        var educations = await GetEducationsAsync(cancellationToken);
        
        var index = educations.FindIndex(e => e.Id == request.Id);
        if (index == -1)
            return false;
            
        educations[index] = new Domain.Education
        {
            Id = request.Id,
            Name = request.Name
        };
        
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