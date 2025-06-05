import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  Page,
  Container,
  Title,
  AddTodoContainer,
  AddInput,
  AddButton,
  QuoteItem,
  DeleteButton,
  EditButton
} from "./Styles";

interface Quote {
  id: string;
  content: string;
}

const initial: Quote[] = [];

const reorder = (list: Quote[], startIndex: number, endIndex: number): Quote[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};



interface QuoteComponentProps {
  quote: Quote;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

function QuoteComponent({ quote, index, onDelete, onEdit }: QuoteComponentProps) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <QuoteItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <span>{quote.content}</span>
          <EditButton onClick={() => onEdit(quote.id)}>Düzenle</EditButton>
          <DeleteButton onClick={() => onDelete(quote.id)}>Sil</DeleteButton>
        </QuoteItem>
      )}
    </Draggable>
  );
}

interface QuoteListProps {
  quotes: Quote[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const QuoteList = React.memo(function QuoteList({ quotes, onDelete, onEdit }: QuoteListProps) {
  return (
    <>
      {quotes.map((quote: Quote, index: number) => (
        <QuoteComponent quote={quote} index={index} key={quote.id} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  );
});

function App() {
  const [quotes, setQuotes] = useState<Quote[]>(initial);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  function onDragEnd(result: any) {
    if (!result.destination || result.destination.index === result.source.index) return;
    const newQuotes = reorder(quotes, result.source.index, result.destination.index);
    setQuotes(newQuotes);
  }

  function handleDelete(id: string) {
    setQuotes(quotes.filter((quote) => quote.id !== id));
  }

  function handleAddTodo() {
    if (newTodoText.trim() === "") return;
    const newTodo: Quote = {
      id: `id-${Date.now()}`,
      content: newTodoText.trim(),
    };
    setQuotes([...quotes, newTodo]);
    setNewTodoText("");
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleAddTodo();
  }

  function handleEditStart(id: string) {
    const current = quotes.find(q => q.id === id);
    if (!current) return;
    setEditId(id);
    setEditText(current.content);
  }

  function handleEditSave() {
    if (editId === null) return;
    setQuotes(prev => prev.map(q => q.id === editId ? { ...q, content: editText } : q));
    setEditId(null);
    setEditText("");
  }

  return (
    <Page>
      <Container>
        <Title>Yapılacaklar Listesi</Title>
        <AddTodoContainer>
          <AddInput
            type="text"
            placeholder="Yeni yapılacak iş..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <AddButton onClick={handleAddTodo}>Ekle</AddButton>
        </AddTodoContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <QuoteList quotes={quotes} onDelete={handleDelete} onEdit={handleEditStart} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Container>

      <Modal show={editId !== null} onHide={() => setEditId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yapılacak İş Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Yeni metin girin"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditId(null)}>Vazgeç</Button>
          <Button variant="success" onClick={handleEditSave}>Kaydet</Button>
        </Modal.Footer>
      </Modal>
    </Page>
  );
}

export default App;
