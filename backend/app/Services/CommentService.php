<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Comment\CommentCreateData;
use App\Data\Comment\CommentData;
use App\Data\Comment\CommentUpdateData;
use App\Models\Comment;
use App\Repositories\CommentRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class CommentService
{
    public function __construct(private CommentRepository $commentRepository) {}

    public function getAllComments(int $perPage): LengthAwarePaginator
    {
        return $this->commentRepository->getAllPaginated($perPage);
    }

    public function getCommentById(string $id): CommentData
    {
        /** @var Comment|null $comment */
        $comment = $this->commentRepository->getById($id);

        return CommentData::from($comment);

    }

    public function createComment(CommentCreateData $data): CommentData
    {
        $comment = Comment::query()->create($data->toArray());

        return CommentData::from($comment);
    }

    public function updateComment(string $id, CommentUpdateData $data): CommentData
    {
        $comment = Comment::query()->findOrFail($id);
        $comment->update($data->toArray());

        return CommentData::from($comment);
    }

    public function deleteComment(string $id): void
    {
        $comment = Comment::query()->findOrFail($id);
        $comment->delete();
    }
}
