/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";
import TextArea from "@/components/ui/TextArea";

type Proptypes = {
  handleSubmit: any;
  benefits: string[];
  setBenefits: any;
  onChangeBenefit: any;
  details: string[];
  setDetails: any;
  onChangeDetail: any;
  setFirstPage: any;
  isLoading: any;
};

const PageTwo = (props: Proptypes) => {
  const {
    handleSubmit,
    benefits,
    setBenefits,
    onChangeBenefit,
    details,
    setDetails,
    onChangeDetail,
    setFirstPage,
    isLoading,
  } = props;
  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {/* Product Description */}
      <InputGroup title="Product Description">
        <TextArea label="Description" name="description" />
      </InputGroup>

      {/* Product Benefit */}
      <InputGroup title="Product Benefit">
        {benefits.map((item: any, index: number) => (
          <div key={index}>
            <Input
              label={`Benefit ${index + 1}`}
              name="benefit"
              placeholder="Input benefit"
              type="text"
              onChange={onChangeBenefit}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button type="button" onClick={() => setBenefits([...benefits, ""])}>
            <i className="bx bx-plus" />
          </Button>
        </div>
      </InputGroup>

      <InputGroup title="Product Detail">
        <Input
          label="Colour Shown"
          name="colour"
          placeholder="Colour Shown"
          type="text"
        />
        <Input label="Style" name="style" placeholder="Style" type="text" />
        <Input
          label="Country/Region of Origin"
          name="country"
          placeholder="Country/Region of Origin"
          type="text"
        />

        <p className="mt-6 mb-2 font-semibold text-md text-neutral-700">
          More Details
        </p>
        {details.map((item: any, index: number) => (
          <div key={index}>
            <Input
              label={`Detail ${index + 1}`}
              name="detail"
              placeholder="Input detail"
              type="text"
              onChange={onChangeDetail}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button type="button" onClick={() => setDetails([...details, ""])}>
            <i className="bx bx-plus" />
          </Button>
        </div>
      </InputGroup>

      <div className="flex gap-2">
        <Button
          type="button"
          classname="mt-4 w-full"
          onClick={() => setFirstPage(true)}
        >
          <i className="bx-chevrons-left text-xl bx" />
          Previous Page
        </Button>
        <Button type="submit" classname="mt-4 w-full">
          <i className="text-xl bx bx-save" />
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default PageTwo;
