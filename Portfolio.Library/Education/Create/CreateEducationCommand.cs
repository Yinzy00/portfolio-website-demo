using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Education.Create;

public record CreateEducationCommand(string Name) : IRequest<Domain.Education>;

public class CreateEducationCommandHandler : IRequestHandler<CreateEducationCommand, Domain.Education>
{
    private readonly string _dataPath = "Data/Education.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public CreateEducationCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<Domain.Education> Handle(CreateEducationCommand request, CancellationToken cancellationToken)
    {
        var educations = await GetEducationsAsync(cancellationToken);
        
        var education = new Domain.Education
        {
            Id = Guid.NewGuid().ToString(),
            Name = request.Name
        };
        
        educations.Add(education);
        await SaveEducationsAsync(educations, cancellationToken);
        
        return education;
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