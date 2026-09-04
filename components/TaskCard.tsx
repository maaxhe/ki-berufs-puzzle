"use client";

import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { Task } from "@/types";
import CategoryMark from "./CategoryMark";

interface TaskCardProps extends ComponentPropsWithoutRef<"button"> {
  task: Task;
  selected?: boolean;
  dragging?: boolean;
}

const TaskCard = forwardRef<HTMLButtonElement, TaskCardProps>(function TaskCard(
  { task, selected = false, dragging = false, className = "", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      data-draggable
      aria-pressed={selected}
      className={`w-full cursor-grab rounded-[2px] border px-3 py-2.5 text-left transition-colors active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mensch ${
        selected
          ? "border-ink bg-ink text-paper"
          : "border-rule bg-paper text-ink hover:border-ink"
      } ${dragging ? "opacity-40" : ""} ${className}`}
      {...rest}
    >
      <span className="flex items-start gap-2.5">
        <CategoryMark
          category={task.category}
          className={`mt-[3px] ${selected ? "text-paper" : "text-ink-2"}`}
        />
        <span className="min-w-0">
          <span className="block text-[0.9rem] font-semibold leading-snug">
            {task.title}
          </span>
          <span
            className={`mt-0.5 block font-prose text-[0.85rem] leading-snug ${
              selected ? "text-paper/80" : "text-ink-2"
            }`}
          >
            {task.description}
          </span>
        </span>
      </span>
    </button>
  );
});

export default TaskCard;
