namespace Portfolio.Library.Languages.Domain;

public record Language
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required int Proficiency { get; init; }
}