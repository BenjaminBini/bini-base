package io.bini.sample.team;

import io.bini.base.mapper.GenericMapperService;
import io.bini.base.service.BaseService;
import org.springframework.stereotype.Service;

@Service
public class TeamService extends BaseService<Team, TeamDTO, Long> {

    // private final TeamRepository teamRepository;

    public TeamService(TeamRepository repository, GenericMapperService mapperService) {
        super(repository, mapperService);
        // this.teamRepository = repository;
    }
}
