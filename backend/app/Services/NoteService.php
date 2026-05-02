<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Note\NoteCreateData;
use App\Data\Note\NoteData;
use App\Data\Note\NoteUpdateData;
use App\Models\Note;
use App\Repositories\NoteRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class NoteService
{
    public function __construct(private NoteRepository $noteRepository) {}

    public function getAllNotes(int $perPage): LengthAwarePaginator
    {
        return $this->noteRepository->getAllPaginated($perPage);
    }

    public function getNoteById(string $id): NoteData
    {
        /** @var Note|null $note */
        $note = $this->noteRepository->getById($id);

        return NoteData::from($note);
    }

    public function createNote(NoteCreateData $data): NoteData
    {
        $note = Note::query()->create($data->toArray());

        return NoteData::from($note);
    }

    public function updateNote(string $id, NoteUpdateData $data): NoteData
    {
        $note = Note::query()->findOrFail($id);
        $note->update($data->toArray());

        return NoteData::from($note);
    }

    public function deleteNote(string $id): void
    {
        $note = Note::query()->findOrFail($id);
        $note->delete();
    }
}
