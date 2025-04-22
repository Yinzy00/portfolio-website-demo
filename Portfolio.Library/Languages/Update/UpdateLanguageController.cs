using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Languages.Update;

[ApiController]
[Route("api/languages")]
public class UpdateLanguageController : ControllerBase
{
    private readonly IMediator _mediator;

    public UpdateLanguageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateLanguageCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID in URL must match ID in request body");
            
        var result = await _mediator.Send(command);
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}