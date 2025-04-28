using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.PersonalInfo.Update;

[ApiController]
[Route("api/personal-info")]
public class UpdatePersonalInfoController : ControllerBase
{
    private readonly IMediator _mediator;

    public UpdatePersonalInfoController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdatePersonalInfoCommand command)
    {
        var result = await _mediator.Send(command);
        
        if (!result)
            return BadRequest();
            
        return NoContent();
    }
}