using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Education.Create;

[ApiController]
[Route("api/education")]
public class CreateEducationController : ControllerBase
{
    private readonly IMediator _mediator;

    public CreateEducationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEducationCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
    }
}