using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Education.Delete;

[ApiController]
[Route("api/education")]
public class DeleteEducationController : ControllerBase
{
    private readonly IMediator _mediator;

    public DeleteEducationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _mediator.Send(new DeleteEducationCommand(id));
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}