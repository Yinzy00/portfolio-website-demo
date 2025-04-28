using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Skills.Get;

public record GetSkillsQuery : IRequest<List<Domain.Skill>>;

public class GetSkillsQueryHandler : IRequestHandler<GetSkillsQuery, List<Domain.Skill>>
{
    private readonly string _dataPath = "Data/Skill.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public GetSkillsQueryHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<List<Domain.Skill>> Handle(GetSkillsQuery request, CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return new List<Domain.Skill>();

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? new List<Domain.Skill>() 
            : JsonSerializer.Deserialize<List<Domain.Skill>>(json, _jsonOptions) ?? new List<Domain.Skill>();
    }
}