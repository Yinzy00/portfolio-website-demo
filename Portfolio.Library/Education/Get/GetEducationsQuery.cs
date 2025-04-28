using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Education.Get;

public record GetEducationsQuery : IRequest<List<Domain.Education>>;

public class GetEducationsQueryHandler : IRequestHandler<GetEducationsQuery, List<Domain.Education>>
{
    private readonly string _dataPath = "Data/Education.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public GetEducationsQueryHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<List<Domain.Education>> Handle(GetEducationsQuery request, CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return new List<Domain.Education>();

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? new List<Domain.Education>() 
            : JsonSerializer.Deserialize<List<Domain.Education>>(json, _jsonOptions) ?? new List<Domain.Education>();
    }
}