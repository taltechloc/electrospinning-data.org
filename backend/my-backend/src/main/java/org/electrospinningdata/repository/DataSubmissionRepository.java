package org.electrospinningdata.repository;

import org.electrospinningdata.model.DataSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DataSubmissionRepository extends JpaRepository<DataSubmission, Integer> {
    Optional<DataSubmission> findBySubmissionId(Long submissionId);
}
