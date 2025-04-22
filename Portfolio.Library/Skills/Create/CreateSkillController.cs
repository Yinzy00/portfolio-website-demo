using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Skills.Create;

[ApiController]
[Route("api/skills")]
public class CreateSkillController : ControllerBase
{
    private readonly IMediator _mediator;

    public CreateSkillController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSkillCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
    }
}