using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.PersonalInfo.Get;

[ApiController]
[Route("api/personal-info")]
[ApiExplorerSettings(GroupName = "Education")]
public class GetPersonalInfoController : ControllerBase
{
    private readonly IMediator _mediator;

    public GetPersonalInfoController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _mediator.Send(new GetPersonalInfoQuery());
        
        if (result == null)
            return NotFound();
            
        return Ok(result);
    }
}