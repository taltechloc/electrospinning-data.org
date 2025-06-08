package org.electrospinningdata.repository;

import org.electrospinningdata.model.CollectorProperty;
import org.electrospinningdata.model.Experiments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectorPropertyRepository extends JpaRepository<CollectorProperty, Long> {
    CollectorProperty findByExperiment(Experiments experiment);
}
