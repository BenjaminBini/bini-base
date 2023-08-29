package io.bini.sample.team;

import io.bini.base.exception.ExistingRelationshipException;
import io.bini.base.web.controller.APIResponse;
import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/team")
public class TeamController extends BaseController<Team, TeamDTO, Long> {

    @Autowired
    public TeamController(TeamService service) {
        super(service);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse list(@RequestParam Map<String, String> searchParams, @RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "2000") int delta) {
        return super.list(searchParams, page, delta);
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse get(@PathVariable("id") Long id) {
        return super.get(id);
    }

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse save(@RequestBody TeamDTO dto) {
        return super.save(dto);
    }

    @Override
    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse update(@RequestBody TeamDTO dto) {
        return super.update(dto);
    }

    @Override
    @DeleteMapping("/{id}")
    protected ResponseEntity<TeamDTO> delete(@PathVariable("id") Long id) throws ExistingRelationshipException {
        return super.delete(id);
    }

    @Override
    @PostMapping("/delete")
    @PreAuthorize("hasAuthority('ADMIN')")
    protected ResponseEntity<TeamDTO> delete(@RequestBody Iterable<Long> ids) throws ExistingRelationshipException {
        return super.delete(ids);
    }
}
