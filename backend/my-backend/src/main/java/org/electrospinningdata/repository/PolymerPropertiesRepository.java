package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.PolymerProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolymerPropertiesRepository extends JpaRepository<PolymerProperties, Long> {
    PolymerProperties findByExperiment(Experiments experiment);
}
