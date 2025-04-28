using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Languages.Create;

[ApiController]
[Route("api/languages")]
public class CreateLanguageController : ControllerBase
{
    private readonly IMediator _mediator;

    public CreateLanguageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLanguageCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
    }
}