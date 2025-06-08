package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.FiberProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FiberPropertiesRepository extends JpaRepository<FiberProperties, Long> {
    FiberProperties findByExperiment(Experiments experiment);
}
