package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperimentRepository extends JpaRepository<Experiments, Integer> {
    @Query("SELECT e.id FROM Experiments e")
    List<Integer> findAllExperimentIds();

    List<Experiments> findByStatus(Experiments.Status status);

    @Query("SELECT ds.experimentId FROM Experiments ds WHERE ds.status = 'PENDING'")
    List<Integer> findPendingExperimentIds();

    @Query("SELECT ds.experimentId FROM Experiments ds WHERE ds.status = 'APPROVED'")
    List<Integer> findAllApprovedExperimentIds();
}
