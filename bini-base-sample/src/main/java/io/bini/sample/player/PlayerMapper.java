package io.bini.sample.player;

import io.bini.base.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlayerMapper extends GenericMapper<Player, PlayerDTO> {
    
}
