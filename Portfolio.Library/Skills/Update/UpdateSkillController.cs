using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Skills.Update;

[ApiController]
[Route("api/skills")]
public class UpdateSkillController : ControllerBase
{
    private readonly IMediator _mediator;

    public UpdateSkillController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateSkillCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID in URL must match ID in request body");
            
        var result = await _mediator.Send(command);
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}