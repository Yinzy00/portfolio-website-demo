using System.Text.Json;
using MediatR;

namespace Portfolio.Library.PersonalInfo.Update;

public record UpdatePersonalInfoCommand(
    string FullName,
    string Email,
    string BirthDate,
    string Nationality,
    string ProfileSketch,
    string? PhoneNumber
) : IRequest<bool>;

public class UpdatePersonalInfoCommandHandler : IRequestHandler<UpdatePersonalInfoCommand, bool>
{
    private readonly string _dataPath = "Data/PersonalInfo.json";
    private readonly JsonSerializerOptions _jsonOptions;

    public UpdatePersonalInfoCommandHandler()
    {
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<bool> Handle(UpdatePersonalInfoCommand request, CancellationToken cancellationToken)
    {
        var personalInfo = new Domain.PersonalInfo
        {
            FullName = request.FullName,
            Email = request.Email,
            BirthDate = request.BirthDate,
            Nationality = request.Nationality,
            ProfileSketch = request.ProfileSketch,
            PhoneNumber = request.PhoneNumber
        };
        
        await SavePersonalInfoAsync(personalInfo, cancellationToken);
        return true;
    }
    
    private async Task SavePersonalInfoAsync(Domain.PersonalInfo personalInfo, CancellationToken cancellationToken)
    {
        var directory = Path.GetDirectoryName(_dataPath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var json = JsonSerializer.Serialize(personalInfo, _jsonOptions);
        await File.WriteAllTextAsync(_dataPath, json, cancellationToken);
    }
}