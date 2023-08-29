package io.bini.sample.player;

import io.bini.base.mapper.GenericMapperService;
import io.bini.base.service.BaseService;
import org.springframework.stereotype.Service;

@Service
public class PlayerService extends BaseService<Player, PlayerDTO, Long> {

    // private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository repository, GenericMapperService mapperService) {
        super(repository, mapperService);
        // this.playerRepository = repository;
    }
}
