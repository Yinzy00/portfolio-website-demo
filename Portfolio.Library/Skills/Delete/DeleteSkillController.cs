using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Skills.Delete;

[ApiController]
[Route("api/skills")]
public class DeleteSkillController : ControllerBase
{
    private readonly IMediator _mediator;

    public DeleteSkillController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _mediator.Send(new DeleteSkillCommand(id));
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}