"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CircleCheck, ListPlus } from "lucide-react";
import { useState } from "react";
import {
  taskAssignments,
  taskCategories,
  type TaskAssignment,
  type TaskCategory
} from "@piggy-days/core";
import { createTask, getTasks } from "@/lib/api/client";
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

export function TasksPage() {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("daily");
  const [assignedTo, setAssignedTo] = useState<TaskAssignment>("me");
  const [coinValue, setCoinValue] = useState(5);
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [plannedDate, setPlannedDate] = useState("");

  const tasksQuery = useQuery({
    queryKey: ["tasks", "all"],
    queryFn: () => getTasks("all")
  });
  const createMutation = useMutation({
    mutationFn: () =>
      createTask({
        type: "simple",
        title,
        category,
        description: optionalString(description),
        place: optionalString(place),
        plannedDate: plannedDate ? new Date(plannedDate).toISOString() : undefined,
        createdByUserId: currentUser,
        assignedTo,
        coinValue
      }),
    onSuccess: async () => {
      setTitle("");
      setDescription("");
      setPlace("");
      setPlannedDate("");
      setCoinValue(5);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const tasks = tasksQuery.data?.tasks ?? [];

  return (
    <section className="tasksPage" aria-labelledby="tasks-title">
      <header className="pageHeader">
        <div>
          <p className="pageEyebrow">{t.tasksPage.eyebrow}</p>
          <h1 id="tasks-title">{t.tasksPage.title}</h1>
          <p className="heroCopy">{t.tasksPage.description}</p>
        </div>
        <span className="statusPill">
          {t.tasksPage.currentUserPrefix}: {t.settings.users[currentUser]}
        </span>
      </header>

      <section className="loopGrid" aria-label={t.tasksPage.formTitle}>
        <form
          className="taskComposer"
          onSubmit={(event) => {
            event.preventDefault();
            createMutation.mutate();
          }}
        >
          <div className="sectionTitleRow">
            <ListPlus size={20} aria-hidden="true" />
            <h2>{t.tasksPage.formTitle}</h2>
          </div>

          <label className="fieldLabel">
            <span>{t.tasksPage.titleLabel}</span>
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t.tasksPage.titlePlaceholder}
            />
          </label>

          <div className="formGridTwo">
            <label className="fieldLabel">
              <span>{t.tasksPage.categoryLabel}</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as TaskCategory)}
              >
                {taskCategories.map((nextCategory) => (
                  <option key={nextCategory} value={nextCategory}>
                    {t.taskLabels.categories[nextCategory]}
                  </option>
                ))}
              </select>
            </label>

            <label className="fieldLabel">
              <span>{t.tasksPage.assignedToLabel}</span>
              <select
                value={assignedTo}
                onChange={(event) => setAssignedTo(event.target.value as TaskAssignment)}
              >
                {taskAssignments.map((assignment) => (
                  <option key={assignment} value={assignment}>
                    {t.taskLabels.assignments[assignment]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="formGridTwo">
            <label className="fieldLabel">
              <span>{t.tasksPage.coinValueLabel}</span>
              <input
                min={1}
                max={100}
                type="number"
                value={coinValue}
                onChange={(event) => setCoinValue(Number(event.target.value))}
              />
            </label>

            <label className="fieldLabel">
              <span>{t.tasksPage.plannedDateLabel}</span>
              <input
                type="datetime-local"
                value={plannedDate}
                onChange={(event) => setPlannedDate(event.target.value)}
              />
            </label>
          </div>

          <label className="fieldLabel">
            <span>{t.tasksPage.descriptionLabel}</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t.tasksPage.descriptionPlaceholder}
              rows={3}
            />
          </label>

          <label className="fieldLabel">
            <span>{t.tasksPage.placeLabel}</span>
            <input
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder={t.tasksPage.placePlaceholder}
            />
          </label>

          {createMutation.error ? (
            <p className="formError">{createMutation.error.message}</p>
          ) : null}

          <button
            className="primaryActionLink formButton"
            disabled={createMutation.isPending}
            type="submit"
          >
            {createMutation.isPending ? t.tasksPage.creatingButton : t.tasksPage.createButton}
          </button>
        </form>

        <section className="taskListPanel" aria-labelledby="task-list-title">
          <div className="sectionTitleRow">
            <CircleCheck size={20} aria-hidden="true" />
            <h2 id="task-list-title">{t.tasksPage.listTitle}</h2>
          </div>

          {tasksQuery.isLoading ? <p className="mutedText">{t.common.loading}</p> : null}
          {tasksQuery.error ? <p className="formError">{tasksQuery.error.message}</p> : null}

          {!tasksQuery.isLoading && tasks.length === 0 ? (
            <div className="softEmpty">
              <strong>{t.tasksPage.emptyTitle}</strong>
              <p>{t.tasksPage.emptyBody}</p>
            </div>
          ) : null}

          <div className="taskList">
            {tasks.map((task) => (
              <article className="taskRow" key={task.id}>
                <div>
                  <div className="taskRowTitle">
                    <strong>{task.title}</strong>
                    <span className={`miniPill ${task.status}`}>
                      {t.taskLabels.statuses[task.status]}
                    </span>
                  </div>
                  <p>
                    {t.taskLabels.categories[task.category]} ·{" "}
                    {t.taskLabels.assignments[task.assignedTo]} · {task.coinValue} {t.common.coins}
                  </p>
                  {formatDateTime(task.plannedDate) ? (
                    <small>{formatDateTime(task.plannedDate)}</small>
                  ) : null}
                </div>
                <Link className="secondaryActionLink compactAction" href={`/tasks/${task.id}`}>
                  <span>{t.tasksPage.openDetail}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
