namespace Portfolio.Library.PersonalInfo.Domain;

public record PersonalInfo
{
    public required string FullName { get; init; }
    public required string Email { get; init; }
    public required string BirthDate { get; init; }
    public required string Nationality { get; init; }
    public required string ProfileSketch { get; init; }
    public string? PhoneNumber { get; init; }
}