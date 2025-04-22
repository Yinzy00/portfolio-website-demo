using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Skills.Create;

public record CreateSkillCommand(string Name) : IRequest<Domain.Skill>;

public class CreateSkillCommandHandler : IRequestHandler<CreateSkillCommand, Domain.Skill>
{
    private readonly string _dataPath = "Data/Skill.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public CreateSkillCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<Domain.Skill> Handle(CreateSkillCommand request, CancellationToken cancellationToken)
    {
        var skills = await GetSkillsAsync(cancellationToken);
        
        var skill = new Domain.Skill
        {
            Id = Guid.NewGuid().ToString(),
            Name = request.Name
        };
        
        skills.Add(skill);
        await SaveSkillsAsync(skills, cancellationToken);
        
        return skill;
    }
    
    private async Task<List<Domain.Skill>> GetSkillsAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return new List<Domain.Skill>();

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? new List<Domain.Skill>() 
            : JsonSerializer.Deserialize<List<Domain.Skill>>(json, _jsonOptions) ?? new List<Domain.Skill>();
    }
    
    private async Task SaveSkillsAsync(List<Domain.Skill> skills, CancellationToken cancellationToken)
    {
        var directory = Path.GetDirectoryName(_dataPath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var json = JsonSerializer.Serialize(skills, _jsonOptions);
        await File.WriteAllTextAsync(_dataPath, json, cancellationToken);
    }
}