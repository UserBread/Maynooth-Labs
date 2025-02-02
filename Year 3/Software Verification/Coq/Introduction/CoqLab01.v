Section CoqLab01.
Context (A B C D : Prop).

(* Implication is transitive. *)
Lemma q1 : (A -> B) -> (B -> C) -> (A -> C).
Proof.
  (* todo *)
  intros H H1 H2.
  apply H1.
  apply H.
  exact H2.
Admitted.

(* Anything implies itself. *)
Lemma q2 : A -> A.
Proof.
  (* todo *)
  intros H.
  apply H.
Admitted.

(* Extra hypotheses can be introduced without affecting
 * provability. *)
Lemma q3 : A -> (B -> A).
Proof.
  (* todo *)
  intros H H1.
  apply H.
Admitted.

(* The order of the hypotheses is irrelevant. *)
Lemma q4 : (A -> B -> C) -> B -> A -> C.
Proof.
  (* todo *)
  intros H H1 H2.
  apply H.
  exact H2.
  exact H1. 
Admitted.

(* Duplicate hypotheses can be merged. *)
Lemma q6 : (A -> A -> B) -> A -> B.
Proof.
  (* todo *)
  intros H H1.
  apply H.
  exact H1.
  exact H1.
Admitted.

(* Duplicate hypotheses can be introduced. *)
Lemma q7 : (A -> B) -> A -> A -> B.
Proof.
  (* todo *)
  intros H H1 H2.
  apply H.
exact H2.
Admitted.

(* Diamond lemma:
 *        A
 *      ↙   ↘           A
 *     B     C    ~>    ↓
 *      ↘   ↙           D
 *        D
 *)
Lemma q8 : (A -> B) -> (A -> C) -> (B -> C -> D) -> A -> D.
Proof.
  (* todo *)
  intros H H1 H2 H3.
  apply H2.
  apply H.
  exact H3.
  apply H1.
  exact H3.
Admitted.

(* Weak version of Peirce’s law. The strong version implies
 * LEM and therefore can’t be proved in constructive logic. *)
Lemma q9 : ((((A -> B) -> A) -> A) -> B) -> B.
Proof.
  (* todo *)
  intros H.
  apply H.
  intros H1.
  apply H1.
  intros H2.
  apply H.
  intros H3.
  exact H2.
Admitted.

End CoqLab01.