import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { OrderQuestion as OQ } from '../../../types/exam';

interface SortableItemProps {
  id: string;
  index: number;
  text: string;
  reviewMode: boolean;
  isCorrectPos: boolean;
}

function SortableItem({ id, index, text, reviewMode, isCorrectPos }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let cls = 'order-item';
  if (isDragging) cls += ' dragging';
  if (reviewMode) cls += isCorrectPos ? ' correct-pos' : ' wrong-pos';

  return (
    <div ref={setNodeRef} style={style} className={cls} {...attributes}>
      {!reviewMode && (
        <span className="order-handle" {...listeners}>⠿</span>
      )}
      <span className="order-num">{index + 1}</span>
      <span className="order-text">{text}</span>
      {reviewMode && (
        <span className={`order-review-mark ${isCorrectPos ? 'correct-pos' : 'wrong-pos'}`}>
          {isCorrectPos ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
}

interface Props {
  question: OQ;
  order: number[];      // shuffledOrders[q.id] — array of original indices
  onOrderChange: (newOrder: number[]) => void;
  reviewMode?: boolean;
}

export default function OrderQuestion({ question, order, onOrderChange, reviewMode = false }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // IDs are stable strings for dnd-kit
  const ids = order.map((origIdx) => `item-${origIdx}`);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);
      const newOrder = arrayMove(order, oldIndex, newIndex);
      onOrderChange(newOrder);
    }
  }

  return (
    <div className="order-list-wrapper">
      <p className="order-hint">
        {reviewMode ? '// CORRECT ORDER SHOWN' : '// DRAG TO REORDER'}
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="order-list">
            {order.map((origIdx, displayIdx) => (
              <SortableItem
                key={`item-${origIdx}`}
                id={`item-${origIdx}`}
                index={displayIdx}
                text={question.items[origIdx]}
                reviewMode={reviewMode}
                isCorrectPos={origIdx === displayIdx}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
