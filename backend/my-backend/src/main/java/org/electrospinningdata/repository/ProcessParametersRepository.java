package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.ProcessParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessParametersRepository extends JpaRepository<ProcessParameter, Long> {
    ProcessParameter findByExperiment(Experiments experiment);
}
