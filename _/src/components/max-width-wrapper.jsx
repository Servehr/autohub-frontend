import PropTypes from "prop-types";

export default function MaxWidthWrapper({ children }) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full md:max-w-[1400px]">{children}</div>
    </div>
  );
}

MaxWidthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
