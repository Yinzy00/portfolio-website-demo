using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Skills.Update;

public record UpdateSkillCommand(string Id, string Name) : IRequest<bool>;

public class UpdateSkillCommandHandler : IRequestHandler<UpdateSkillCommand, bool>
{
    private readonly string _dataPath = "Data/Skill.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public UpdateSkillCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<bool> Handle(UpdateSkillCommand request, CancellationToken cancellationToken)
    {
        var skills = await GetSkillsAsync(cancellationToken);
        
        var index = skills.FindIndex(e => e.Id == request.Id);
        if (index == -1)
            return false;
            
        skills[index] = new Domain.Skill
        {
            Id = request.Id,
            Name = request.Name
        };
        
        await SaveSkillsAsync(skills, cancellationToken);
        return true;
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