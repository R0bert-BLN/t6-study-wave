<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Note\NoteCreateData;
use App\Data\Note\NoteUpdateData;
use App\Services\NoteService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class NoteController extends BaseController
{
    public function __construct(private NoteService $noteService) {}

    public function index(): JsonResponse
    {
        $note = $this->noteService->getAllNotes($this->getPerPage());

        return $this->success($note);
    }

    public function show(string $id): JsonResponse
    {
        $note = $this->noteService->getNoteById($id);

        return $this->success($note);
    }

    public function store(NoteCreateData $data): JsonResponse
    {
        $note = $this->noteService->createNote($data);

        return $this->success(data: $note, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, NoteUpdateData $data): JsonResponse
    {
        $note = $this->noteService->updateNote($id, $data);

        return $this->success($note);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->noteService->deleteNote($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
