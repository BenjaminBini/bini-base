package io.bini.sample.team;

import io.bini.base.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TeamMapper extends GenericMapper<Team, TeamDTO> {

}
