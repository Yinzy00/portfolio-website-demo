using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Library.Languages.Get;

[ApiController]
[Route("api/languages")]
public class GetLanguagesController : ControllerBase
{
    private readonly IMediator _mediator;

    public GetLanguagesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _mediator.Send(new GetLanguagesQuery());
        return Ok(result);
    }
}