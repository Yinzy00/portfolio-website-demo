using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Education.Get;

[ApiController]
[Route("api/education")]
public class GetEducationsController : ControllerBase
{
    private readonly IMediator _mediator;

    public GetEducationsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _mediator.Send(new GetEducationsQuery());
        return Ok(result);
    }
}