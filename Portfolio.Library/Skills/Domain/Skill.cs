namespace Portfolio.Library.Skills.Domain;

public record Skill
{
    public required string Id { get; init; }
    public required string Name { get; init; }
}