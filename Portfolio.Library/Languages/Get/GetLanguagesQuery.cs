using System.Text.Json;
using MediatR;

namespace Portfolio.Library.Languages.Get;

public record GetLanguagesQuery : IRequest<List<Domain.Language>>;

public class GetLanguagesQueryHandler : IRequestHandler<GetLanguagesQuery, List<Domain.Language>>
{
    private readonly string _dataPath = "Data/Language.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public GetLanguagesQueryHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<List<Domain.Language>> Handle(GetLanguagesQuery request, CancellationToken cancellationToken)
    {
        if (!File.Exists(_dataPath))
            return new List<Domain.Language>();

        var json = await File.ReadAllTextAsync(_dataPath, cancellationToken);
        return string.IsNullOrEmpty(json) 
            ? new List<Domain.Language>() 
            : JsonSerializer.Deserialize<List<Domain.Language>>(json, _jsonOptions) ?? new List<Domain.Language>();
    }
}