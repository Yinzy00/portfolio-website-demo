namespace Portfolio.Library.Education.Domain;

public record Education
{
    public required string Id { get; init; }
    public required string Name { get; init; }
}