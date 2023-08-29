package io.bini.sample.player;

import io.bini.base.web.controller.APIResponse;
import io.bini.base.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/player")
public class PlayerController extends BaseController<Player, PlayerDTO, Long> {

    @Autowired
    public PlayerController(PlayerService service) {
        super(service);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    protected APIResponse list(@RequestParam Map<String, String> searchParams) {
        return super.list(searchParams);
    }


}
