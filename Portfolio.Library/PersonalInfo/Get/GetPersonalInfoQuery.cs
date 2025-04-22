using System.Text.Json;
using MediatR;

namespace Portfolio.Library.PersonalInfo.Get;

public record GetPersonalInfoQuery : IRequest<Domain.PersonalInfo?>;

public class GetPersonalInfoQueryHandler : IRequestHandler<GetPersonalInfoQuery, Domain.PersonalInfo?>
{
    private readonly string _dataPath = "Data/PersonalInfo.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public GetPersonalInfoQueryHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<Domain.PersonalInfo?> Handle(GetPersonalInfoQuery request, CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return null;

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? null
            : JsonSerializer.Deserialize<Domain.PersonalInfo>(json, _jsonOptions);
    }
}