"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BadgeCheck, Coins } from "lucide-react";
import { useState } from "react";
import { completeTask, getTask } from "@/lib/api/client";
import { useCurrentUser } from "@/lib/currentUser";
import { useI18n } from "@/lib/i18n/useI18n";

function optionalString(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function formatDateTime(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function TaskDetailPage({ taskId }: { taskId: string }) {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { t } = useI18n();
  const [note, setNote] = useState("");
  const [place, setPlace] = useState("");
  const [costCents, setCostCents] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const taskQuery = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId)
  });
  const completeMutation = useMutation({
    mutationFn: () =>
      completeTask(taskId, {
        completedByUserId: currentUser,
        note: optionalString(note),
        place: optionalString(place),
        costCents: costCents.trim() ? Number(costCents) : undefined,
        photoUrl: optionalString(photoUrl)
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["task", taskId] }),
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        queryClient.invalidateQueries({ queryKey: ["fund"] }),
        queryClient.invalidateQueries({ queryKey: ["coins"] }),
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] })
      ]);
    }
  });

  const task = taskQuery.data?.task;
  const isCompleted = task?.status === "completed";

  return (
    <section className="taskDetailPage" aria-labelledby="task-detail-title">
      <Link className="backLink" href="/tasks">
        <ArrowLeft size={16} aria-hidden="true" />
        <span>{t.taskDetailPage.backToTasks}</span>
      </Link>

      {taskQuery.isLoading ? <p className="mutedText">{t.taskDetailPage.loading}</p> : null}
      {taskQuery.error ? <p className="formError">{taskQuery.error.message}</p> : null}

      {!taskQuery.isLoading && !task ? (
        <div className="softEmpty">
          <strong>{t.taskDetailPage.missingTitle}</strong>
        </div>
      ) : null}

      {task ? (
        <>
          <header className="pageHeader">
            <div>
              <p className="pageEyebrow">{t.routes.taskDetail.eyebrow}</p>
              <h1 id="task-detail-title">{task.title}</h1>
              <p className="heroCopy">{task.description ?? t.taskDetailPage.completionBody}</p>
            </div>
            <span className={`statusPill ${task.status}`}>
              {t.taskLabels.statuses[task.status]}
            </span>
          </header>

          <section className="detailGrid">
            <article className="detailPanel">
              <div className="sectionTitleRow">
                <Coins size={20} aria-hidden="true" />
                <h2>{t.taskDetailPage.reward}</h2>
              </div>
              <dl className="detailList">
                <div>
                  <dt>{t.taskDetailPage.reward}</dt>
                  <dd>
                    {task.coinValue} {t.common.coins}
                  </dd>
                </div>
                <div>
                  <dt>{t.taskDetailPage.createdBy}</dt>
                  <dd>{t.settings.users[task.createdByUserId]}</dd>
                </div>
                <div>
                  <dt>{t.taskDetailPage.assignedTo}</dt>
                  <dd>{t.taskLabels.assignments[task.assignedTo]}</dd>
                </div>
                {task.completedByUserId ? (
                  <div>
                    <dt>{t.taskDetailPage.completedBy}</dt>
                    <dd>{t.settings.users[task.completedByUserId]}</dd>
                  </div>
                ) : null}
                {formatDateTime(task.completedAt) ? (
                  <div>
                    <dt>{t.taskDetailPage.completedAt}</dt>
                    <dd>{formatDateTime(task.completedAt)}</dd>
                  </div>
                ) : null}
              </dl>
            </article>

            <article className="detailPanel">
              <div className="sectionTitleRow">
                <BadgeCheck size={20} aria-hidden="true" />
                <h2>{t.taskDetailPage.completionTitle}</h2>
              </div>
              <p className="mutedText">{t.taskDetailPage.completionBody}</p>

              {isCompleted ? (
                <div className="softEmpty successState">
                  <strong>{t.taskDetailPage.completedMessage}</strong>
                  {taskQuery.data?.coinEvents[0] ? (
                    <p>
                      {t.taskDetailPage.coinEventMessage}: {taskQuery.data.coinEvents[0].amount}{" "}
                      {t.common.coins}
                    </p>
                  ) : null}
                </div>
              ) : (
                <form
                  className="completionForm"
                  onSubmit={(event) => {
                    event.preventDefault();
                    completeMutation.mutate();
                  }}
                >
                  <label className="fieldLabel">
                    <span>{t.taskDetailPage.noteLabel}</span>
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      placeholder={t.taskDetailPage.notePlaceholder}
                    />
                  </label>
                  <div className="formGridTwo">
                    <label className="fieldLabel">
                      <span>{t.taskDetailPage.placeLabel}</span>
                      <input
                        value={place}
                        onChange={(event) => setPlace(event.target.value)}
                        placeholder={t.taskDetailPage.placePlaceholder}
                      />
                    </label>
                    <label className="fieldLabel">
                      <span>{t.taskDetailPage.costLabel}</span>
                      <input
                        min={0}
                        type="number"
                        value={costCents}
                        onChange={(event) => setCostCents(event.target.value)}
                      />
                    </label>
                  </div>
                  <label className="fieldLabel">
                    <span>{t.taskDetailPage.photoLabel}</span>
                    <input
                      type="url"
                      value={photoUrl}
                      onChange={(event) => setPhotoUrl(event.target.value)}
                      placeholder={t.taskDetailPage.photoPlaceholder}
                    />
                  </label>

                  {completeMutation.error ? (
                    <p className="formError">{completeMutation.error.message}</p>
                  ) : null}

                  <button
                    className="primaryActionLink formButton"
                    disabled={completeMutation.isPending}
                    type="submit"
                  >
                    {completeMutation.isPending
                      ? t.taskDetailPage.completingButton
                      : t.taskDetailPage.completeButton}
                  </button>
                </form>
              )}
            </article>
          </section>
        </>
      ) : null}
    </section>
  );
}
