<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Comment\CommentCreateData;
use App\Data\Comment\CommentUpdateData;
use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class CommentController extends BaseController
{
    public function __construct(private CommentService $commentService) {}

    public function index(): JsonResponse
    {
        $comment = $this->commentService->getAllComments($this->getPerPage());

        return $this->success($comment);
    }

    public function show(string $id): JsonResponse
    {
        $comment = $this->commentService->getCommentById($id);

        return $this->success($comment);
    }

    public function store(CommentCreateData $data): JsonResponse
    {
        $comment = $this->commentService->createComment($data);

        return $this->success(data: $comment, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, CommentUpdateData $data): JsonResponse
    {
        $comment = $this->commentService->updateComment($id, $data);

        return $this->success($comment);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->commentService->deleteComment($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
