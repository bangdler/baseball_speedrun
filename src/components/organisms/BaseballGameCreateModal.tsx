import { useForm } from "react-hook-form";
import Modal from "../common/Modal";
import BaseballGameApi from "../../api/baseballGame";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  actionAfterSubmit: () => void;
}

interface FormData {
  name: string;
}

const BaseballGameCreateModal = ({
  isOpen,
  onClose,
  actionAfterSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await BaseballGameApi.createGame(data.name);
      actionAfterSubmit();
      onClose();
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>
          게임 이름
          <input
            {...register("name", {
              required: "게임 이름은 필수입니다",
              maxLength: {
                value: 20,
                message: "최대 20자까지 입력 가능합니다",
              },
            })}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="예: 야구의 신"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "생성 중..." : "게임 생성"}
        </button>
      </form>
    </Modal>
  );
};

export default BaseballGameCreateModal;