using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Education.Update;

[ApiController]
[Route("api/education")]
public class UpdateEducationController : ControllerBase
{
    private readonly IMediator _mediator;

    public UpdateEducationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateEducationCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID in URL must match ID in request body");
            
        var result = await _mediator.Send(command);
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}