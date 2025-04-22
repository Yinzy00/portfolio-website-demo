using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Languages.Delete;

[ApiController]
[Route("api/languages")]
public class DeleteLanguageController : ControllerBase
{
    private readonly IMediator _mediator;

    public DeleteLanguageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _mediator.Send(new DeleteLanguageCommand(id));
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}