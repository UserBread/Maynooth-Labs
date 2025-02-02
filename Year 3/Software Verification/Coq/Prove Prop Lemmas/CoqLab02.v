Section CoqLab02.

Context (A B C : Prop).

(***************************************************)
(* And / Or *)

Lemma q1 : (A /\ B) /\ C -> A /\ (B /\ C).
Proof.
  (* todo *)
intros H.
destruct H as [[H1 H2] H3].
split.
exact H1.
split.
exact H2.
exact H3.
Qed.

Lemma q2 : ((A /\ B) -> C) -> (A -> (B -> C)).
Proof.
  (* todo *)
intros H H1 H2.
apply H.
split.
exact H1.
exact H2.

Qed.

Lemma q3 : (A \/ B) \/ C -> A \/ (B \/ C).
Proof.
  (* todo *)
intros H.
destruct H as [H | HA].
destruct H as [HB | HC].
left. exact HB.
right. left. exact HC.
right. right. exact HA.

Qed.

Lemma q4 : ((A \/ B) -> C) -> (A -> (B -> C)).
Proof.
  (* todo *)
intros H H1 H2.
apply H.
left. exact H1.
Qed.

(***************************************************)
(* Negation *)

Lemma q5 : (~A \/ B) -> (A -> B).
Proof.
  (* todo *)
intros H H1.
destruct H.
contradiction.
exact H.
Qed.

Lemma q6 : (A -> B) -> (~B -> ~A).
Proof.
  (* todo *)
intros H H1 H2.
apply H1.
apply H.
exact H2.
Qed.

Lemma q7 : ~(A /\ ~A).
Proof.
  (* todo *)
intros H.
destruct H.
apply H0.
exact H.
Qed.

(***************************************************)
(* De Morgan’s Laws *)

Hypothesis LEM : forall P : Prop, P \/ ~P.

Lemma q8 : ~(A \/ B) -> ~A /\ ~B.
Proof.
  (* todo *)
intros H.
split.
intros HA.
apply H.
left. exact HA.
intros HB.
apply H.
right. exact HB.

Qed.

Lemma q9 : ~A /\ ~B -> ~(A \/ B).
Proof.
  (* todo *)
intros.
destruct H.
intros H1.
apply H.
destruct H1.
exact H1.
contradiction.

Qed.

Lemma q10 : ~A \/ ~B -> ~(A /\ B).
Proof.
  (* todo *)
intros H H1.
destruct H.
destruct H1.
apply H.
apply H0.
apply H.
destruct H1.
apply H1.
Qed.

Lemma q11 : ~(A /\ B) -> ~ A \/ ~ B.
Proof.
  (* todo *)
intros H.
destruct (LEM A).
destruct (LEM B).
right. destruct H. split.
apply H0. apply H1.
right. apply H1.
left. apply H0.
Qed.

End CoqLab02.